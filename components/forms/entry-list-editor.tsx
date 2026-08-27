"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useForm, type DefaultValues, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useProfileStore, type ArrayKey } from "@/lib/store";
import { newId } from "@/lib/utils";
import { toast } from "@/lib/toast-store";
import type { LucideIcon } from "lucide-react";

interface EntryListEditorProps<T extends FieldValues & { id: string }> {
  arrayKey: ArrayKey;
  items: T[];
  schema: ZodType<any>;
  defaultValues: DefaultValues<T>;
  icon: LucideIcon;
  itemLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  renderFields: (helpers: {
    register: ReturnType<typeof useForm<T>>["register"];
    errors: ReturnType<typeof useForm<T>>["formState"]["errors"];
    watch: ReturnType<typeof useForm<T>>["watch"];
  }) => ReactNode;
  renderSummary: (item: T) => ReactNode;
}

export function EntryListEditor<T extends FieldValues & { id: string }>({
  arrayKey,
  items,
  schema,
  defaultValues,
  icon: Icon,
  itemLabel,
  emptyTitle,
  emptyDescription,
  renderFields,
  renderSummary,
}: EntryListEditorProps<T>) {
  const addItem = useProfileStore((s) => s.addItem);
  const updateItem = useProfileStore((s) => s.updateItem);
  const removeItem = useProfileStore((s) => s.removeItem);
  const reorderItems = useProfileStore((s) => s.reorderItems);

  const [mode, setMode] = useState<"idle" | "add" | "edit">("idle");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Tracks the draft entry currently being previewed live in the portfolio
  // panel, so we know whether to discard it (unsaved "add") or restore it
  // (edited but cancelled) when the editor closes without a real save.
  const draftIdRef = useRef<string | null>(null);
  const draftInStoreRef = useRef(false);
  const originalRef = useRef<T | null>(null);
  const modeRef = useRef(mode);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // Push every keystroke into the store (debounced) while a form is open,
  // so the portfolio preview reflects the entry as it's being typed —
  // not just after "Save" is clicked.
  useEffect(() => {
    const subscription = watch((values) => {
      if (modeRef.current === "idle") return;
      const id = draftIdRef.current;
      if (!id) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      setIsSyncing(true);
      debounceRef.current = setTimeout(() => {
        if (modeRef.current === "add" && !draftInStoreRef.current) {
          addItem<T>(arrayKey, { ...(values as T), id });
          draftInStoreRef.current = true;
        } else {
          updateItem<T>(arrayKey, id, values as Partial<T>);
        }
        setIsSyncing(false);
      }, 350);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, arrayKey]);

  // Safety net: if the component unmounts (e.g. the user switches editor
  // sections) while a draft is still open, don't leave an unsaved "add"
  // entry behind or an edited-but-uncancelled entry in a half-typed state.
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (modeRef.current === "add" && draftInStoreRef.current && draftIdRef.current) {
        removeItem(arrayKey, draftIdRef.current);
      } else if (modeRef.current === "edit" && draftIdRef.current && originalRef.current) {
        updateItem<T>(arrayKey, draftIdRef.current, originalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeEditor() {
    setMode("idle");
    setEditingId(null);
    setIsSyncing(false);
    draftIdRef.current = null;
    draftInStoreRef.current = false;
    originalRef.current = null;
    reset(defaultValues);
  }

  function startAdd() {
    const id = newId();
    draftIdRef.current = id;
    draftInStoreRef.current = false;
    originalRef.current = null;
    reset({ ...(defaultValues as object), id } as unknown as DefaultValues<T>);
    setEditingId(null);
    setMode("add");
  }

  function startEdit(item: T) {
    draftIdRef.current = item.id;
    draftInStoreRef.current = true;
    originalRef.current = item;
    reset(item);
    setEditingId(item.id);
    setMode("edit");
  }

  function cancel() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (mode === "add" && draftInStoreRef.current && draftIdRef.current) {
      removeItem(arrayKey, draftIdRef.current);
    } else if (mode === "edit" && draftIdRef.current && originalRef.current) {
      updateItem<T>(arrayKey, draftIdRef.current, originalRef.current);
    }
    closeEditor();
  }

  function onSubmit(values: T) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const id = draftIdRef.current ?? editingId;
    if (mode === "edit" && id) {
      updateItem<T>(arrayKey, id, values);
      toast({ title: `${itemLabel} updated`, variant: "success" });
    } else if (id) {
      // Already synced into the store live (or not, if the user filled
      // the form fast enough to beat the debounce) — either way, this
      // write makes sure the final, validated values are what stick.
      if (draftInStoreRef.current) {
        updateItem<T>(arrayKey, id, values);
      } else {
        addItem<T>(arrayKey, { ...values, id });
      }
      toast({ title: `${itemLabel} added`, variant: "success" });
    } else {
      addItem<T>(arrayKey, values);
      toast({ title: `${itemLabel} added`, variant: "success" });
    }
    closeEditor();
  }

  function confirmDelete() {
    if (deleteTarget) {
      removeItem(arrayKey, deleteTarget);
      toast({ title: `${itemLabel} removed` });
    }
    setDeleteTarget(null);
  }

  // Hide the entry currently being drafted from the list below — it's
  // already represented by the open form above, so showing it twice
  // would look like a duplicate.
  const visibleItems =
    mode === "idle" ? items : items.filter((item) => item.id !== draftIdRef.current);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-medium text-ink">{itemLabel}s</h2>
        {mode === "idle" && (
          <Button size="sm" onClick={startAdd}>
            <Plus className="h-3.5 w-3.5" />
            Add {itemLabel.toLowerCase()}
          </Button>
        )}
      </div>

      {mode !== "idle" && (
        <Card className="mt-4 bg-surface-raised">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-ink-soft">
              {mode === "edit" ? `Editing ${itemLabel.toLowerCase()}` : `New ${itemLabel.toLowerCase()}`}
            </span>
            <span
              className={`flex items-center gap-1.5 text-xs text-ink-soft transition-opacity ${
                isSyncing ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              Updating preview…
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {renderFields({ register, errors, watch })}
            <div className="flex items-center justify-between gap-2 pt-1">
              <p className="text-xs text-ink-soft">
                Changes show in the preview as you type.
              </p>
              <div className="flex shrink-0 gap-2">
                <Button type="button" variant="outline" size="sm" onClick={cancel}>
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  {mode === "edit" ? "Save changes" : `Add ${itemLabel.toLowerCase()}`}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}

      <div className="mt-4 space-y-3">
        {items.length === 0 && mode === "idle" && (
          <EmptyState
            icon={Icon}
            title={emptyTitle}
            description={emptyDescription}
            actionLabel={`+ Add your first ${itemLabel.toLowerCase()}`}
            onAction={startAdd}
          />
        )}

        {visibleItems.map((item) => {
          const index = items.findIndex((i) => i.id === item.id);
          return (
            <Card key={item.id} className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">{renderSummary(item)}</div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  className="focus-ring rounded p-1.5 text-ink-soft hover:text-ink disabled:opacity-30"
                  onClick={() => reorderItems(arrayKey, index, index - 1)}
                  disabled={index === 0}
                  aria-label={`Move ${itemLabel.toLowerCase()} up`}
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  className="focus-ring rounded p-1.5 text-ink-soft hover:text-ink disabled:opacity-30"
                  onClick={() => reorderItems(arrayKey, index, index + 1)}
                  disabled={index === items.length - 1}
                  aria-label={`Move ${itemLabel.toLowerCase()} down`}
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  className="focus-ring rounded p-1.5 text-ink-soft hover:text-ink"
                  onClick={() => startEdit(item)}
                  aria-label={`Edit ${itemLabel.toLowerCase()}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  className="focus-ring rounded p-1.5 text-ink-soft hover:text-clay"
                  onClick={() => setDeleteTarget(item.id)}
                  aria-label={`Delete ${itemLabel.toLowerCase()}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={`Delete this ${itemLabel.toLowerCase()}?`}
        description="This can't be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

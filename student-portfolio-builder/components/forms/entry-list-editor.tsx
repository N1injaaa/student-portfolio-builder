"use client";

import { useState } from "react";
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

  function startAdd() {
    reset(defaultValues);
    setEditingId(null);
    setMode("add");
  }

  function startEdit(item: T) {
    reset(item);
    setEditingId(item.id);
    setMode("edit");
  }

  function cancel() {
    setMode("idle");
    setEditingId(null);
    reset(defaultValues);
  }

  function onSubmit(values: T) {
    if (mode === "edit" && editingId) {
      updateItem<T>(arrayKey, editingId, values);
      toast({ title: `${itemLabel} updated`, variant: "success" });
    } else {
      addItem<T>(arrayKey, values);
      toast({ title: `${itemLabel} added`, variant: "success" });
    }
    cancel();
  }

  function confirmDelete() {
    if (deleteTarget) {
      removeItem(arrayKey, deleteTarget);
      toast({ title: `${itemLabel} removed` });
    }
    setDeleteTarget(null);
  }

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {renderFields({ register, errors, watch })}
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" size="sm" onClick={cancel}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                {mode === "edit" ? "Save changes" : `Add ${itemLabel.toLowerCase()}`}
              </Button>
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

        {items.map((item, index) => (
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
        ))}
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

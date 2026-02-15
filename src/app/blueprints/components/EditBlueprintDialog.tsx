
'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import TagSelector from "./TagSelector"
import { useState, useEffect } from "react"
import type { Blueprint } from "@/types/blueprint"

type EditBlueprintDialogProps = {
  blueprint: Blueprint;
  onSave: (updates: Partial<Blueprint>) => void;
  children: React.ReactNode;
}

export default function EditBlueprintDialog({ blueprint, onSave, children }: EditBlueprintDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(blueprint.title)
  const [description, setDescription] = useState(blueprint.description || "")
  const [identityGoal, setIdentityGoal] = useState(blueprint.identityGoal || "")
  const [tags, setTags] = useState(blueprint.tags || [])

  useEffect(() => {
    if (open) {
      setTitle(blueprint.title)
      setDescription(blueprint.description || "")
      setIdentityGoal(blueprint.identityGoal || "")
      setTags(blueprint.tags || [])
    }
  }, [open, blueprint])

  const handleSave = () => {
    onSave({
      title,
      description,
      identityGoal,
      tags,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Blueprint</DialogTitle>
          <DialogDescription>
            Make changes to your blueprint's core details.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" rows={3} />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="identityGoal" className="text-right pt-2">
              Identity Goal
            </Label>
            <Textarea id="identityGoal" value={identityGoal} onChange={(e) => setIdentityGoal(e.target.value)} className="col-span-3" placeholder="I am becoming someone who..." rows={2} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Tags
            </Label>
            <div className="col-span-3">
              <TagSelector selected={tags} onChange={setTags} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="button" onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

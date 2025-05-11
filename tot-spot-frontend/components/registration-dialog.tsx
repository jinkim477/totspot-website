"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RegistrationForm } from "@/components/registration-form"

export function RegistrationDialog({
  isOpen,
  onClose,
  programName,
}: {
  isOpen: boolean
  onClose: () => void
  programName: string
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-pink-600">
            Registration for {programName}
          </DialogTitle>
        </DialogHeader>
        <RegistrationForm programName={programName} onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}

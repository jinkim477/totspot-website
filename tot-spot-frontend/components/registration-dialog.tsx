"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RegistrationForm } from "@/components/registration-form"

export function RegistrationDialog({
  isOpen,
  onClose,
  programName,
  programDays,
  programTime,
  programPrice,
}: {
  isOpen: boolean
  onClose: () => void
  programName: string
  programDays: string
  programTime: string
  programPrice: string
  
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-pink-600">
            Registration for {programName}
          </DialogTitle>
        </DialogHeader>
        <RegistrationForm programName={programName} programDays={programDays} programTime={programTime} programPrice={programPrice} onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}

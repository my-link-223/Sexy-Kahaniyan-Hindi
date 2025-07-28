"use client"

import { useState, useEffect } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AgeGateModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      const isVerified = localStorage.getItem("age-verified")
      if (!isVerified) {
        setIsOpen(true)
      }
    } catch (error) {
      console.info("Could not access localStorage. Age gate will show on every visit.")
      setIsOpen(true)
    }
  }, [])

  const handleConfirm = () => {
    try {
      localStorage.setItem("age-verified", "true")
    } catch (error) {
        console.info("Could not access localStorage.")
    }
    setIsOpen(false)
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-headline">18+ Content Warning</AlertDialogTitle>
          <AlertDialogDescription>
            This website contains adult content including sensual and erotic stories intended for a mature audience. By entering, you confirm that you are 18 years of age or older and that it is legal to view such material in your jurisdiction.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirm} className="bg-primary hover:bg-primary/90">
            I am 18 or older
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

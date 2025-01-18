'use client'
import { useEffect } from "react";
import { useAppContext } from "./appContext";

export default function AppDefault() {
  const {setIsPageLoading} = useAppContext()
  useEffect(()=>{
    setIsPageLoading(false)
  })
  return (
    <div>
      Select room to start chatting
    </div>
  );
}
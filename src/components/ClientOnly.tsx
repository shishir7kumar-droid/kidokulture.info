"use client";
import { useEffect } from "react";

export default function ClientOnly() {
  useEffect(() => {
    // Break Service Worker Cache
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
          registration.unregister();
          console.log('ServiceWorker UNREGISTERED successfully to break cache');
        }
      });
    }
  }, []);

  return null;
}

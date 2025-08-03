"use client"

import type React from "react"

import { Refine } from "@refinedev/core"
import routerBindings from "@refinedev/nextjs-router/app"
import { refineDataProvider } from "@/lib/refine-data-provider"
import { useToast } from "@/hooks/use-toast"

// This component wraps the Refine app and provides necessary context
export function RefineConfig({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()

  return (
    <Refine
      dataProvider={refineDataProvider}
      routerProvider={routerBindings}
      resources={[
        {
          name: "medicines",
          list: "/admin/products",
          create: "/admin/products/new",
          edit: "/admin/products/:id/edit",
          show: "/admin/products/:id", // Optional, but good practice
          meta: {
            label: "Products",
          },
        },
        {
          name: "orders",
          list: "/admin/orders",
          show: "/admin/orders/:id",
          meta: {
            label: "Orders",
          },
        },
      ]}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        disableTelemetry: true,
        reactQuery: {
          clientConfig: {
            defaultOptions: {
              queries: {
                staleTime: 5 * 60 * 1000, // 5 minutes
                refetchOnWindowFocus: false,
              },
            },
          },
        },
      }}
      notificationProvider={{
        open: ({ message, type, description }) => {
          toast({
            title: message,
            description: description,
            variant: type === "success" ? "default" : "destructive",
          })
        },
        close: () => {},
      }}
    >
      {children}
    </Refine>
  )
}

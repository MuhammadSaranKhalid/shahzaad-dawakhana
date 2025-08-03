import { dataProvider } from "@refinedev/supabase"
import { supabaseClient } from "./supabaseClient"

// Removed mapKeys as we are now consistently using snake_case for database fields
export const refineDataProvider = dataProvider(supabaseClient)

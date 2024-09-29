import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iydqcxxoakqnzrqnasnn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5ZHFjeHhvYWtxbnpycW5hc25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0MzEyNzUsImV4cCI6MjA0MzAwNzI3NX0.C3_K88dEOAteM8yQ1dInt82NJjxTqPpSg8SIdfZ13CE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

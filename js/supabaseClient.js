// Usamos el CDN de jspm para importar Supabase directamente en el navegador
import { createClient } from 'https://jspm.dev/@supabase/supabase-js';

// REEMPLAZA ESTO CON TUS DATOS DE SUPABASE
const supabaseUrl = 'https://nakvvaptczmuugcpnvbo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ha3Z2YXB0Y3ptdXVnY3BudmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NzU4MjMsImV4cCI6MjA5MzA1MTgyM30.aWD8W24BhnIgnHgZPeMoGVuKamnnX7Xk5rsxk-k388s';

export const supabase = createClient(supabaseUrl, supabaseKey);

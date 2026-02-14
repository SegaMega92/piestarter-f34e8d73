
-- Drop the recursive policy
DROP POLICY "Admins can read user_roles" ON public.user_roles;

-- Allow users to read their own roles
CREATE POLICY "Users can read own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

import { useSupabase } from '~/hooks/useSupabase'
export function Login() {
    const supabase = useSupabase()

    const handleLogOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.log('error al iniciar sesion', error)
    }
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github'
        })
        if (error) console.log('error al iniciar sesion', error)
    }
    return (
        <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleLogOut}>Cerrar sesion</button>
            <button onClick={handleLogin}>Iniciar sesion</button>
        </div>
    )
}
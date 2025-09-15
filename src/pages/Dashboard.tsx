import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LogOut, User as UserIcon, FileText, Settings } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate('/auth');
        } else {
          // Defer profile fetch to avoid deadlock
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate('/auth');
      } else {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo cerrar sesión",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error inesperado",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary">INFORIA</h1>
            <span className="text-sm text-muted-foreground">
              Panel Profesional
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {profile?.full_name || user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Welcome Card */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                ¡Bienvenido, {profile?.full_name || 'Profesional'}!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Estado de la cuenta</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      profile?.subscription_status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <span className="capitalize">
                      {profile?.subscription_status || 'pendiente'}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Plan actual</p>
                  <span className="capitalize font-medium">
                    {profile?.plan_type || 'professional'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Créditos usados</p>
                  <span>
                    {profile?.credits_used || 0} / {profile?.credits_limit || 100}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Email</p>
                  <span className="text-sm">{user.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Reportes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled>
                Crear Nuevo Reporte
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Próximamente disponible
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Pacientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" disabled>
                Gestionar Pacientes
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Próximamente disponible
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" disabled>
                Ajustes de Cuenta
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Próximamente disponible
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Onboarding Status */}
        {profile && !profile.onboarding_completed && (
          <Card className="mt-6 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">
                Completa tu perfil profesional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700 mb-4">
                Para acceder a todas las funcionalidades, completa tu información profesional.
              </p>
              <Button variant="outline" className="border-yellow-300 text-yellow-800" disabled>
                Completar Perfil
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
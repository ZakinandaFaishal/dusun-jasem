import { ProfileForm } from "@/features/profil/components/profile-form";
import { getDusunProfile } from "@/services/profile";

export default async function DashboardProfilPage() {
  const profile = await getDusunProfile();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-foreground">
        Kelola Profil Dusun
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Data ini dipakai di halaman Beranda dan Tentang Dusun. Perubahan
        langsung tampil setelah disimpan.
      </p>

      <div className="mt-6">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}

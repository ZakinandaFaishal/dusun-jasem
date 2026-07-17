"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/shared/image-upload-field";
import { updateProfile, type ProfileFormState } from "../actions/update-profile";
import type { DusunProfile } from "@/types";

const INITIAL_STATE: ProfileFormState = { success: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Menyimpan..." : "Simpan Perubahan"}
    </Button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-display text-base font-bold text-foreground">{title}</h2>
      <div className="mt-4 grid gap-4">{children}</div>
    </div>
  );
}

export function ProfileForm({ profile }: { profile: DusunProfile }) {
  const [state, formAction] = useActionState(updateProfile, INITIAL_STATE);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  const error = (field: string) => state.fieldErrors?.[field]?.[0];

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <Section title="Hero & Landing Page">
        <div className="grid gap-2">
          <Label htmlFor="name">Nama Dusun</Label>
          <Input id="name" name="name" defaultValue={profile.name} required />
          {error("name") ? <p className="text-xs text-red-600">{error("name")}</p> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input id="tagline" name="tagline" defaultValue={profile.tagline} required />
        </div>
        <ImageUploadField
          name="hero_image_url"
          label="Foto Aerial (Hero)"
          folder="profil"
          defaultValue={profile.hero_image_url}
        />
        {error("hero_image_url") ? (
          <p className="text-xs text-red-600">{error("hero_image_url")}</p>
        ) : null}
      </Section>

      <Section title="Statistik Singkat">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="total_rt">Jumlah RT</Label>
            <Input id="total_rt" name="total_rt" type="number" min={0} defaultValue={profile.total_rt} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="total_penduduk">Jumlah Penduduk</Label>
            <Input
              id="total_penduduk"
              name="total_penduduk"
              type="number"
              min={0}
              defaultValue={profile.total_penduduk}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="luas_wilayah_ha">Luas Wilayah (Ha)</Label>
            <Input
              id="luas_wilayah_ha"
              name="luas_wilayah_ha"
              type="number"
              min={0}
              step="0.1"
              defaultValue={profile.luas_wilayah_ha}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jumlah_kelompok_tani">Jumlah Kelompok Tani</Label>
            <Input
              id="jumlah_kelompok_tani"
              name="jumlah_kelompok_tani"
              type="number"
              min={0}
              defaultValue={profile.jumlah_kelompok_tani}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="komoditas_unggulan">Komoditas Unggulan</Label>
          <Input
            id="komoditas_unggulan"
            name="komoditas_unggulan"
            defaultValue={profile.komoditas_unggulan ?? ""}
            placeholder="mis. Cabai, Padi, Jagung"
          />
        </div>
      </Section>

      <Section title="Tentang Dusun">
        <div className="grid gap-2">
          <Label htmlFor="sejarah">Sejarah</Label>
          <Textarea id="sejarah" name="sejarah" defaultValue={profile.sejarah ?? ""} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="visi">Visi</Label>
          <Textarea id="visi" name="visi" defaultValue={profile.visi ?? ""} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="misi">Misi</Label>
          <Textarea id="misi" name="misi" defaultValue={profile.misi ?? ""} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="letak_geografis">Letak Geografis</Label>
          <Textarea
            id="letak_geografis"
            name="letak_geografis"
            defaultValue={profile.letak_geografis ?? ""}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="batas_wilayah">Batas Wilayah</Label>
          <Textarea id="batas_wilayah" name="batas_wilayah" defaultValue={profile.batas_wilayah ?? ""} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="kondisi_alam">Kondisi Alam</Label>
          <Textarea id="kondisi_alam" name="kondisi_alam" defaultValue={profile.kondisi_alam ?? ""} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="map_latitude">Latitude Peta</Label>
            <Input
              id="map_latitude"
              name="map_latitude"
              type="number"
              step="any"
              defaultValue={profile.map_latitude ?? ""}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="map_longitude">Longitude Peta</Label>
            <Input
              id="map_longitude"
              name="map_longitude"
              type="number"
              step="any"
              defaultValue={profile.map_longitude ?? ""}
            />
          </div>
        </div>
      </Section>

      <Section title="Kontak">
        <div className="grid gap-2">
          <Label htmlFor="alamat">Alamat</Label>
          <Textarea id="alamat" name="alamat" defaultValue={profile.alamat ?? ""} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="telepon_kepala_dukuh">Telepon Kepala Dukuh</Label>
            <Input
              id="telepon_kepala_dukuh"
              name="telepon_kepala_dukuh"
              defaultValue={profile.telepon_kepala_dukuh ?? ""}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input id="whatsapp" name="whatsapp" defaultValue={profile.whatsapp ?? ""} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" defaultValue={profile.email ?? ""} />
          {error("email") ? <p className="text-xs text-red-600">{error("email")}</p> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="jam_pelayanan">Jam Pelayanan</Label>
          <Input
            id="jam_pelayanan"
            name="jam_pelayanan"
            defaultValue={profile.jam_pelayanan ?? ""}
            placeholder="mis. Senin–Jumat, 08.00–15.00"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="instagram_url">Instagram</Label>
            <Input
              id="instagram_url"
              name="instagram_url"
              type="url"
              defaultValue={profile.instagram_url ?? ""}
            />
            {error("instagram_url") ? (
              <p className="text-xs text-red-600">{error("instagram_url")}</p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="facebook_url">Facebook</Label>
            <Input
              id="facebook_url"
              name="facebook_url"
              type="url"
              defaultValue={profile.facebook_url ?? ""}
            />
            {error("facebook_url") ? (
              <p className="text-xs text-red-600">{error("facebook_url")}</p>
            ) : null}
          </div>
        </div>
      </Section>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}

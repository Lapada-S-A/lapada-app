<template>
  <div>
    <div class="mb-8">
      <span class="font-subtitle font-weight-bold text-primary mr-3"
        >Fotos</span
      >
      <span class="font-small text-font-60">(máx: 4)</span>
    </div>
    <div class="d-flex align-center">
      <v-file-upload
        v-model="uploadedimages"
        max-width="75"
        max-height="75"
        browse-text=""
        title=""
        divider-text=""
        icon=""
        multiple
        clearable
        @change="
          uploadedimages = uploadedimages.slice(0, 4);
          showErrorMessage = false;
        "
      >
        <template #browse="{ props }">
          <v-btn variant="plain" size="75" @click="props.onClick">
            <v-icon size="30" color="primary">mdi-cloud-upload-outline</v-icon>
          </v-btn>
        </template>

        <template #item="{ file, props }">
          <div class="d-flex flex-column position-relative">
            <img :src="getImagePreview(file)" class="image-preview" >
            <v-icon
              class="remove-icon position-absolute"
              @click="props['onClick:remove']"
            >
              mdi-close
            </v-icon>
          </div>
        </template>
      </v-file-upload>

      <div v-if="showErrorMessage" class="ml-4 text-error font-small">
        É necessário adicionar ao menos uma foto.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  AuctionPhotos,
  AuctionPhotosResponse,
} from "~/interfaces/auction";
import { Buffer } from "buffer";


const componentProps = defineProps<{
  validate: boolean;
  auctionImages?: AuctionPhotosResponse[];
}>();
const emit = defineEmits(["update:validation", "update:images"]);
const uploadedimages = ref<File[]>([]);
const photos = ref<AuctionPhotos>({
  photo1: null,
  photo2: null,
  photo3: null,
  photo4: null,
});
const showErrorMessage = ref<boolean>(false);

onMounted(() => {
  if (componentProps.auctionImages) {
    componentProps.auctionImages.forEach((img, index) => {
      const base64String = Buffer.from(
        img.pdfData.data as unknown as string,
        "binary"
      ).toString("base64");

      const file = base64ToFile(base64String, `image${index + 1}.png`);

      uploadedimages.value.push(file);
    });
  }
});

function getImagePreview(file: File) {
  if (file && file.type.startsWith("image/")) {
    return URL.createObjectURL(file);
  }
  return "";
}

function base64ToFile(base64String: string, fileName: string): File {
  const byteCharacters = atob(base64String);
  const byteArrays = new Uint8Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays[i] = byteCharacters.charCodeAt(i);
  }

  const blob = new Blob([byteArrays], { type: "image/png" });
  return new File([blob], fileName, { type: "image/png" });
}

watch(
  () => componentProps.validate,
  () => {
    uploadedimages.value.forEach((file, index) => {
      photos.value[`photo${index + 1}` as keyof AuctionPhotos] = file;
    });

    const filteredPhotos = Object.fromEntries(
      Object.entries(photos.value).filter(([_, value]) => value !== null)
    );

    if (uploadedimages.value.length > 0) {
      emit("update:images", filteredPhotos);
      emit("update:validation", true);
    } else {
      showErrorMessage.value = true;
      emit("update:validation", false);
    }
  }
);
</script>

<style scoped>
:deep(.v-file-upload-divider) {
  display: none;
}

:deep(.v-sheet) {
  padding: 0;
  margin-right: 8px;
  border-color: rgba(var(--v-theme-secondary));
}

:deep(.v-file-upload-items) {
  display: flex;
  gap: 8px;
  margin: 0;
}

img {
  width: 75px;
  height: 75px;
  border-radius: 6px;
}

.image-preview {
  width: 75px;
  height: 75px;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.remove-icon {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: white;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.position-relative:hover .remove-icon {
  opacity: 1;
}
</style>

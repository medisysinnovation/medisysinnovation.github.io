const maxSizeByte = 200 * 1024;

export function loadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = e => reject(e);
    img.src = src;
  });
}
export function getDataUrlFromFile(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = e => reject(e);
    reader.readAsDataURL(file);
  });
}
export function getNewCanvasAndCtx(width: number, height: number) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  return [canvas, ctx];
}
export function cleanupCanvasMemory(canvas: any) {
  canvas.width = 0;
  canvas.height = 0;
}

export function getFilefromDataUrl(
  dataUrl: any,
  filename: string,
  lastModified = Date.now(),
) {
  return new Promise(resolve => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = window.atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new Blob([u8arr], { type: mime });
    // @ts-ignore
    file.name = filename;
    // @ts-ignore
    file.lastModified = lastModified;
    resolve(file);

    // Safari has issue with File constructor not being able to POST in FormData
    // https://github.com/Donaldcwl/browser-image-compression/issues/8
    // https://bugs.webkit.org/show_bug.cgi?id=165081
    // let file
    // try {
    //   file = new File([u8arr], filename, { type: mime }) // Edge do not support File constructor
    // } catch (e) {
    //   file = new Blob([u8arr], { type: mime })
    //   file.name = filename
    //   file.lastModified = lastModified
    // }
    // resolve(file)
  });
}

export async function canvasToFile(
  // @ts-ignore
  canvas,
  // @ts-ignore
  fileType,
  // @ts-ignore
  fileName,
  // @ts-ignore
  fileLastModified,
  quality = 1,
) {
  // checked on Win Edge 44, Win IE 11, Win Firefox 76, MacOS Firefox 77, MacOS Safari 13.1
  const dataUrl = canvas.toDataURL(fileType, quality);
  return await getFilefromDataUrl(dataUrl, fileName, fileLastModified);
}

export async function compressImage(file: File | Blob) {
  if (file.size < maxSizeByte) {
    return file;
  }
  let compressedFile = file;
  let fileSize = compressedFile.size;

  // @ts-ignore
  const dataUrl = await getDataUrlFromFile(file);
  // @ts-ignore
  const image = await loadImage(dataUrl);
  // @ts-ignore
  let newWidth = image.width;
  // @ts-ignore
  let newHeight = image.height;
  let quality = 1;
  while (true) {
    try {
      if (fileSize > 1 * 1024 * 1024) {
        quality = 0.7;
      } else if (fileSize > 0.5 * 1024 * 1024) {
        quality = 0.8;
      } else if (fileSize > 0.25 * 1024 * 1024) {
        quality = 0.9;
      }
      newWidth = newWidth * quality;
      newHeight = newHeight * quality;
      const [canvas, ctx] = getNewCanvasAndCtx(newWidth, newHeight);
      // @ts-ignore
      ctx.drawImage(image, 0, 0, newWidth, newHeight);
      // @ts-ignore
      compressedFile = await canvasToFile(
        canvas,
        file.type,
        // @ts-ignore
        file.name,
        // @ts-ignore
        file.lastModified,
        quality,
      );
      fileSize = compressedFile.size;
      cleanupCanvasMemory(canvas);
      // console.log(fileSize);
      if (fileSize < maxSizeByte) {
        return compressedFile;
      }
    } catch {
      return file;
    }
  }
}

const rootTIFFUrl =
  'https://vitessce-data.storage.googleapis.com/vanderbilt.images/';

const tiffInfo = {
  isTiff: true,
  isZarr: false,
  channels: {
    'Cy3 - Synaptopodin (glomerular)': `${rootTIFFUrl}Cy3 - Synaptopodin (glomerular).ome.tiff`,
    'Cy5 - THP (thick limb)': `${rootTIFFUrl}Cy5 - THP (thick limb).ome.tiff`,
    'DAPI - Hoescht (nuclei)': `${rootTIFFUrl}DAPI - Hoescht (nuclei).ome.tiff`,
    'FITC - Laminin (basement membrane)': `${rootTIFFUrl}FITC - Laminin (basement membrane).ome.tiff`
  }
};

// We store all chunks in the same pyramid so they all have the same URL.
// TODO: Add logic for when pyramids are in separate files; most similar to tiff.
const rootZarrUrl =
  'https://vitessce-demo-data.storage.googleapis.com/test-data/vanderbilt-data/vanderbilt_mxif_ims.zarr/mxif_pyramid';

const zarrInfo = {
  isTiff: false,
  isZarr: true,
  type: 'tiled',
  channels: {
    'Cy3 - Synaptopodin (glomerular)': rootZarrUrl,
    'Cy5 - THP (thick limb)': rootZarrUrl,
    'DAPI - Hoescht (nuclei)': rootZarrUrl,
    'FITC - Laminin (basement membrane)': rootZarrUrl
  }
};
const rootStaticZarrUrl =
  'https://vitessce-demo-data.storage.googleapis.com/test-data/codex/codex_r001_x003_y003.zarr';

const staticInfo = {
  isTiff: false,
  isZarr: true,
  type: 'static',
  initialViewState: {
    zoom: -1,
    target: [-500, -500]
  },
  channels: {
    'Cy3 - Synaptopodin (glomerular)': rootStaticZarrUrl,
    'Cy5 - THP (thick limb)': rootStaticZarrUrl,
    'DAPI - Hoescht (nuclei)': rootStaticZarrUrl,
    'FITC - Laminin (basement membrane)': rootStaticZarrUrl
  }
};

export default {
  zarr: zarrInfo,
  tiff: tiffInfo,
  static: staticInfo
};

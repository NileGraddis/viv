/* eslint-disable radix */
import parser from 'fast-xml-parser';

export default class OMEXML {
  constructor(omexmlString) {
    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      trimValues: true,
      allowBooleanAttributes: true
    };
    this.metadataOMEXML = parser.parse(omexmlString, options).OME;
    const { Pixels } = this.metadataOMEXML.Image.length
      ? this.metadataOMEXML.Image[0]
      : this.metadataOMEXML.Image;
    this._Pixels = Pixels;
    this.SizeZ = Number.parseInt(Pixels['@_SizeZ']);
    this.SizeT = Number.parseInt(Pixels['@_SizeT']);
    this.SizeC = Number.parseInt(Pixels['@_SizeC']);
    this.SizeX = Number.parseInt(Pixels['@_SizeX']);
    this.SizeY = Number.parseInt(Pixels['@_SizeY']);
    this.Interleaved = Pixels['@_Interleaved'] === 'true';
    this.DimensionOrder = Pixels['@_DimensionOrder'];
    this.Type = Pixels['@_Type'];
    const PhysicalSizeYUnit = Pixels['@_PhysicalSizeYUnit'];
    // This µ character is not well handled - I got odd behavior but this solves it.
    // There was a prepended character so now I just look for µm to be included
    // and use only µm if it is found.
    this.PhysicalSizeYUnit =
      PhysicalSizeYUnit && PhysicalSizeYUnit.includes('µm')
        ? 'µm'
        : PhysicalSizeYUnit;
    const PhysicalSizeXUnit = Pixels['@_PhysicalSizeXUnit'];
    this.PhysicalSizeXUnit =
      PhysicalSizeXUnit && PhysicalSizeXUnit.includes('µm')
        ? 'µm'
        : PhysicalSizeXUnit;
    this.PhysicalSizeY = Pixels['@_PhysicalSizeY'];
    this.PhysicalSizeX = Pixels['@_PhysicalSizeX'];
    const PhysicalSizeZUnit = Pixels['@_PhysicalSizeZUnit'];
    this.PhysicalSizeZUnit =
      PhysicalSizeZUnit && PhysicalSizeZUnit.includes('µm')
        ? 'µm'
        : PhysicalSizeXUnit;
    this.PhysicalSizeZ = Pixels['@_PhysicalSizeZ'];
  }

  getChannelNames() {
    const { Channel } = this._Pixels;
    return Array.isArray(Channel)
      ? Channel.map((channel, i) => channel['@_Name'] || `Channel ${i}`)
      : [Channel['@_Name'] || `Channel ${0}`];
  }

  getNumberOfImages() {
    console.log(this.metadataOMEXML.Image);
    return this.metadataOMEXML.Image.length || 1;
  }

  get SamplesPerPixel() {
    const { Channel } = this._Pixels;
    return Array.isArray(Channel)
      ? Channel.map(channel => channel['@_SamplesPerPixel'])[0]
      : [Channel['@_SamplesPerPixel']];
  }
}

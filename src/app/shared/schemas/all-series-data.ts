
export interface AllSeriesData {
  allSeries: { [key: string]: Series };
  allISeries?: { [key: string]: Series };
  sortOrder?: SortOrder;
  sortOrderI?: SortOrder;
  offerData?: any;
  installment?: { [key: string]: string };
  allBodyTypes?: any;
}

export interface AllBodyTypes {
    allBodyTypes?: any;
}

export interface Series {
    code:           string;
    modelRanges:    { [key: string]: ModelRange };
    additionalData: any;
}

export interface ModelRange {
    code:           string;
    models:         { [key: string]: Model };
    additionalData: ModelRangeAdditionalData;
}

export interface ModelRangeAdditionalData {
    sortOrder?:     string[];
    minPrice?:      number;
    description?:   any;
    cosyImageUrls?: CosyImageUrls;
    positionModel?: PositionModel;
}

export interface CosyImageUrls {
    POSITIONMODEL_DEFAULT: { [key: string]: ImageDetails };
}

export interface ImageDetails {
    displayOrder:      number;
    imageUrl:          string;
    metadataAvailable: boolean;
}


export interface PositionModel {
    options?:     string;
    collections?: any;
    modelCode:   string;
}

export interface Model {
    transmissionVariants: TransmissionVariant[];
    additionalData:       any;
    effectDate:           string;
    agBodyStyle:          any;
    technicalData:        TechnicalData;
    bodyStyle:            BodyStyle;
    modelRange:           string;
    manufacturer:         Manufacturer;
    transmission:         TransmissionEnum;
    fuelType:             FuelType;
    lineMake:             string;
    modelCode:            string;
    agModelCode:          string;
    series:               string;
    orderDate:            string;
    brand:                Brand;
    hybridFlag:           HybridFlag;
}

export interface TechnicalData {
    enginePower?: string;
    abeHub?:      string;
}

export enum BodyStyle {
    Cp = 'CP',
    Gf = 'GF',
    Gt = 'GT',
    Li = 'LI',
    Sc = 'SC',
}

export enum Brand {
    Bm = 'BM',
}

export enum FuelType {
    D = 'D',
    O = 'O',
}

export enum HybridFlag {
    Nohybr = 'NOHYBR',
}

export enum Manufacturer {
    Wb = 'WB',
}

export enum TransmissionEnum {
    Aut = 'AUT',
}

export interface TransmissionVariant {
    constructible:   boolean;
    includedOptions: string[];
    transmission:    any;
    description?:    any;
    additionalData?: any;
}

export interface Price {
    netListPrice:         number;
    netPrice:             number;
    netDiscount:          number;
    netDiscountPercent:   number;
    grossListPrice:       number;
    grossPrice:           number;
    grossDiscount:        number;
    grossDiscountPercent: number;
    totalTaxes:           number;
    taxes:                any[];
}

export interface SortOrder {
    series:      any;
    modelRanges: any;
    models:      any;
    sortOrder:   FormattedSortOrder;
}

export interface FormattedSortOrder {
    series?:      string[];
    modelRanges?: { [key: string]: string[] };
    models?:      { [key: string]: string[] };
}


export interface EmailSendOtp {
    to:           string;
    targetType:   string;
    name:         string;
    contentType:  string;
    subject:      string;
    status:       boolean;
    targetId:     string;
    htmlContent:  string;
    method:       string;
    'api-key':    string;
    user:         string;
    password:     string;
    'otp-status': OtpStatus;
}

export interface OtpStatus {
    statusCode: string;
    status:     string;
    body:       null;
    requestId:  string;
}

export interface CityDetails {
    //result: CityDetail[];
    //pincodeResponseList:any;
    pincodeResponseList: CityDetail[];
}


export interface CityDetail {
    pincode: string;
    city:    string;
    state:   string;
    amphures?: string;
}

export interface PrefectureListResponse {
    prefectureList: string[];
    status:         string;
}


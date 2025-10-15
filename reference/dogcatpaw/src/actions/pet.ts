'use server';

export type Breed = 'MALTESE' | 'GOLDEN_RETRIEVER' | 'LABRADOR' | 'POODLE' | 'BULLDOG' | 'BEAGLE' | 'CHIHUAHUA' | 'SHIH_TZU' | 'YORKSHIRE_TERRIER' | 'DACHSHUND' | 'OTHER';
export type Gender = 'MALE' | 'FEMALE';

export interface serverActionMessage {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result?: any;
}

export async function registerPetAction(_: any, formData: FormData): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const did = formData.get("did")?.toString() ?? '';
    const petProfile = formData.get("petProfile")?.toString() ?? '';
    const petName = formData.get("petName")?.toString() ?? '';
    const breed = formData.get("breed")?.toString() as Breed;
    const old = parseInt(formData.get("old")?.toString() ?? '0');
    const weight = parseFloat(formData.get("weight")?.toString() ?? '0');
    const gender = formData.get("gender")?.toString() as Gender;
    const color = formData.get("color")?.toString() ?? '';
    const feature = formData.get("feature")?.toString() ?? '';
    const specifics = formData.get("specifics")?.toString() ?? '';
    const neutral = formData.get("neutral") === 'true';

    // Validate required fields
    if (!did || !petProfile || !petName || !breed || !gender || !color || !feature || !specifics) {
      return {
        isSuccess: false,
        status: "400",
        code: "MISSING_REQUIRED_FIELDS",
        message: "모든 필수 필드를 입력해주세요.",
        result: null
      };
    }

    // Validate data types and ranges
    if (old < 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_AGE",
        message: "나이는 0 이상이어야 합니다.",
        result: null
      };
    }

    if (weight <= 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_WEIGHT",
        message: "몸무게는 0보다 커야 합니다.",
        result: null
      };
    }

    // Validate enum values
    const validBreeds: Breed[] = ['MALTESE', 'GOLDEN_RETRIEVER', 'LABRADOR', 'POODLE', 'BULLDOG', 'BEAGLE', 'CHIHUAHUA', 'SHIH_TZU', 'YORKSHIRE_TERRIER', 'DACHSHUND', 'OTHER'];
    const validGenders: Gender[] = ['MALE', 'FEMALE'];

    if (!validBreeds.includes(breed)) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_BREED",
        message: "유효하지 않은 품종입니다.",
        result: null
      };
    }

    if (!validGenders.includes(gender)) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_GENDER",
        message: "성별은 MALE 또는 FEMALE이어야 합니다.",
        result: null
      };
    }

    // Prepare JSON data for API request
    const petData = {
      did,
      petProfile,
      petName,
      breed,
      old,
      weight,
      gender,
      color,
      feature,
      specifics,
      neutral
    };

    // Send POST request to server API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/pet/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '서버 요청 처리 중 오류가 발생했습니다.',
        result: null
      };
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Pet registration error:', error);
    return {
      isSuccess: false,
      status: "500",
      code: "NETWORK_ERROR",
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    };
  }
}
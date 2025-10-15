'use server';

export interface serverActionMessage {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result?: any;
}

export async function preparePaymentAction(_: any, formData: FormData): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const itemId = parseInt(formData.get("itemId")?.toString() ?? '0');

    // Validate required fields
    if (!itemId || itemId <= 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_ITEM_ID",
        message: "유효한 itemId가 필요합니다.",
        result: null
      };
    }

    // Prepare JSON data for API request
    const paymentData = {
      itemId
    };

    // Send POST request to server API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/payment/prepare`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
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
    console.error('Payment prepare error:', error);
    return {
      isSuccess: false,
      status: "500",
      code: "NETWORK_ERROR",
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    };
  }
}

export async function approvePaymentAction(_: any, formData: FormData): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const orderId = formData.get("orderId")?.toString() ?? '';
    const paymentKey = formData.get("paymentKey")?.toString() ?? '';
    const finalAmount = parseInt(formData.get("finalAmount")?.toString() ?? '0');

    // Validate required fields
    if (!orderId || !paymentKey || !finalAmount || finalAmount <= 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "MISSING_REQUIRED_FIELDS",
        message: "orderId, paymentKey, finalAmount는 필수 항목입니다.",
        result: null
      };
    }

    // Prepare JSON data for API request
    const paymentData = {
      orderId,
      paymentKey,
      finalAmount
    };

    // Send POST request to server API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/payment/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '결제 승인 처리 중 오류가 발생했습니다.',
        result: null
      };
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Payment approve error:', error);
    return {
      isSuccess: false,
      status: "500",
      code: "NETWORK_ERROR",
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    };
  }
}
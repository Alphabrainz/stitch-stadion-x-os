// QR Ticket Scanning and Validation

export interface Ticket {
  id: string;
  userId: string;
  matchId: string;
  seat: string;
  gate: string;
  status: 'valid' | 'used' | 'revoked' | 'cancelled';
  price?: number;
}

export const ticketService = {
  validateTicketQR: async (qrHash: string): Promise<{ valid: boolean; ticket?: Ticket }> => {
    console.log(`Validating QR Hash: ${qrHash}`);
    // Future API call to validate cryptographic hash
    return {
      valid: true,
      ticket: {
        id: "TKT-8291",
        userId: "user_123",
        matchId: "WC-42",
        seat: "Sector 204, Row F, Seat 12",
        gate: "Gate B4",
        status: 'valid',
        price: 150
      }
    };
  },

  cancelTicket: async (ticketId: string): Promise<{ success: boolean; refundAmount: number; message: string }> => {
    console.log(`Cancelling ticket ${ticketId}`);
    // Future API call to process refund via payment gateway
    // Mocking a successful 100% refund for this demo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          refundAmount: 150,
          message: 'Refund successfully processed to original payment method.'
        });
      }, 1500);
    });
  },

  transferTicket: async (ticketId: string, targetUserId: string) => {
    console.log(`Transferring ticket ${ticketId} to ${targetUserId}`);
    // Future API call
    return true;
  }
};

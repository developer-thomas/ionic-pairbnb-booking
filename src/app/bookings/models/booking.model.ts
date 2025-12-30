export interface Booking {
    id: number;
    placeId: string;
    userId: string;
    placeTitle: string;
    numberOfGuests: number;
    firstName: string;
    place: UserPlaceResponse
}

interface UserPlaceResponse {
    title: string;
    price: number
}
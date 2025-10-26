export interface Booking {
    id: string;
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
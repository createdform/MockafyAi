export type User = {
    id: number;
    name: {
        firstname: string;
        lastname: string;
    };
    email: string;
    username: string;
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
        geolocation: {
            lat: string;
            long: string;
        };
    };
    phone: string;
}

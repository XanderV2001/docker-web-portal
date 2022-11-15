export type routeItem = {
    to: string,
    name: string,
}

export function useNavItems(): routeItem[] {
    return [{
        to: "/",
        name: "Home"
    }];
}
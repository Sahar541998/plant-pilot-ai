type DetectedPlant = {
    pretty_name: string;
    name: string;
    common_names: string[];
    family: string;
    genus: string;
    image_url: string;
    match_percentage: number;
}

export {DetectedPlant}
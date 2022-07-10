const equipmentDataEN = {
    MEMBER_ERROR: "This user does **not exist** or **cannot be found**.",
    AUTHOR: "Equipment of %user%",
    HEADSET: "Headset",
    LEGWARMERS: "Legwarmers",
    BOOTS: "Boots",
    GLOVES: "Gloves",
    RING: "Ring",
    COLLAR: "Collar",
    BELT: "Belt",
    WEAPON: "Weapon",
    SHIELD: "Shield",
    ARC: "Arc",
    FISHING_ROD: "Fishing rod",
    PICKAXE: "Pickaxe",
    AXE: "Axe",
};


const translateEquipmentEN = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = equipmentDataEN[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateEquipmentEN;

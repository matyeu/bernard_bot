const equipmentDataFR = {
    MEMBER_ERROR: "Cet utilisateur **n'existe pas** ou **n'a pas été trouvé**.",
    AUTHOR: "Équipement de  %user%",
    HEADSET: "Casque",
    LEGWARMERS: "Jambières",
    BOOTS: "Bottes",
    GLOVES: "Gants",
    RING: "Baque",
    COLLAR: "Collier",
    BELT: "Ceinture",
    WEAPON: "Arme",
    SHIELD: "Bouclier",
    ARC: "Arc",
    FISHING_ROD: "Canne à pêche",
    PICKAXE: "Pioche",
    AXE: "Hache",
};


const translateEquipmentFR = (key: string | number, ...args: any[]) => {
    //@ts-ignore
    const translation = equipmentDataFR[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translateEquipmentFR;

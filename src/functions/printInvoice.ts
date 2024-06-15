import { ActivityType, CotisationType, MemberType } from "@/context/type";
import { jsPDF } from "jspdf";
import getCycleNumber from "./getCycleNumber";

export const generePdf = async (
    activity: ActivityType,
    cotisation: CotisationType,
    membre: MemberType,
) => {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [210, 50],
    });

    // add header
    doc.setFont("courier", "normal", "bold");
    doc.setFontSize(11);
    doc.text(new Date(cotisation.created_at).toLocaleDateString(), 200, 10, {
        align: "right",
    });
    // ------------
    doc.text(`Activité: ${activity?.designation}`, 5, 15);
    doc.text(`Début: ${new Date(activity?.start).toLocaleDateString()}`, 5, 20);
    doc.text(`Fin: ${new Date(activity?.end).toLocaleDateString()}`, 5, 25);
    doc.text(
        `Status: ${
            new Date(activity?.end) < new Date() ? "Terminer" : "En cours"
        }`,
        5,
        30,
    );
    // -----------
    doc.text(`${membre.name} ${membre.postname}`, 210 / 2, 25);
    doc.text(membre.phone, 210 / 2, 30);

    // -----------

    doc.setLineWidth(0.3);
    doc.setDrawColor("#4e4e4e");
    doc.setLineDashPattern([0.2, 0.5], 0);
    doc.line(0, 35, 210, 35, "DF");

    doc.text(
        `Cycle: ${getCycleNumber(
            activity?.start,
            activity?.cycle,
            cotisation.created_at,
        )}`,
        5,
        40,
    );

    doc.text(`Montant : ${cotisation.amount} ${activity.currency}`, 5, 45);

    return doc.output("pdfobjectnewwindow", {
        filename: `activity_${activity?.designation}_` + Date.now(),
    });
};

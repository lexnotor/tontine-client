import { ActivityType, CotisationType, MemberType } from "@/context/type";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import getCycleNumber from "./getCycleNumber";

export const generePdf = async (
    activity: ActivityType,
    cotisations: CotisationType[],
    membres: MemberType[],
) => {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
    });

    // add header
    doc.setFont("courier", "normal", "normal");
    doc.setFontSize(11);
    doc.text(`Activité: ${activity?.designation}`, 10, 10);
    doc.text(new Date().toLocaleDateString(), 287, 10, { align: "right" });
    doc.text(
        `Date début: ${new Date(activity?.start).toLocaleDateString()}`,
        10,
        15,
    );
    doc.text(
        `Date Fin: ${new Date(activity?.end).toLocaleDateString()}`,
        10,
        20,
    );
    doc.text(
        `Status: ${
            new Date(activity?.end) < new Date() ? "Terminer" : "En cours"
        }`,
        10,
        25,
    );

    doc.setFont("courier", "normal", "bold");
    doc.setFontSize(14);
    doc.text("Liste de cotisations", 297 / 2, 30, { align: "center" });

    doc.setFont("courier", "normal", "normal");
    doc.setFontSize(11);

    autoTable(doc, {
        margin: { top: 40, left: 10, right: 10 },
        bodyStyles: { font: "courier" },
        headStyles: { font: "courier", fontStyle: "bold" },
        head: [
            [
                "Nom, Postnom",
                "Téléphone",
                "Montant cotisé",
                "Date cotisation",
                "Cycle",
            ],
        ],
        body: cotisations.map((cotisation) => {
            const membre = membres.find(
                (item) => item.id == cotisation.member_id,
            );
            return [
                `${membre.name} ${membre.postname}`,
                membre.phone,
                cotisation.amount,
                new Date(cotisation.created_at).toLocaleDateString(),
                `Cycle ${getCycleNumber(
                    activity?.start,
                    activity?.cycle,
                    cotisation.created_at,
                )}`,
            ];
        }),
    });

    // // logo
    // const image = new Image();
    // await new Promise((resolve, rejected) => {
    //     const timer = setTimeout(rejected, 5000);
    //     image.onload = () => {
    //         clearTimeout(timer);
    //         resolve("Image loaded");
    //     };
    //     image.src = logo;
    // });

    // doc.addImage(
    //     image,
    //     "PNG",
    //     70 - 15,
    //     2,
    //     10,
    //     (image.height * 10) / image.width,
    // );

    // // add date
    // let text = new Date(data.created_at).toDateString();
    // doc.text(text, fromRight(text), 11);
    // text = new Date(data.created_at).toLocaleTimeString();
    // doc.text(text, fromRight(text), 13);

    // doc.line(
    //     5,
    //     27 + data.commands.length * 3,
    //     65,
    //     27 + data.commands.length * 3,
    //     "FD",
    // );

    return doc.output("pdfobjectnewwindow", {
        filename: `activity_${activity?.designation}_` + Date.now(),
    });
};

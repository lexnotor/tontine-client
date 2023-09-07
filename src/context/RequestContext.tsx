import React from "react";
import ActivityContextProvider from "./ActivityContext";
import MemberContextProvider from "./MemberContext";
import CotisationContextProvider from "./CotisationContext";

// ------------- CONTEXT PROVIDER -------------
const RequestContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <MemberContextProvider>
            <ActivityContextProvider>
                <CotisationContextProvider>
                    {children}
                </CotisationContextProvider>
            </ActivityContextProvider>
        </MemberContextProvider>
    );
};

export default RequestContextProvider;

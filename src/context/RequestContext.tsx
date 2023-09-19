import React from "react";
import ActivityContextProvider from "./ActivityContext";
import AuthContextProvider from "./AuthContext";
import CotisationContextProvider from "./CotisationContext";
import MemberContextProvider from "./MemberContext";

// ------------- CONTEXT PROVIDER -------------
const RequestContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <AuthContextProvider>
            <ActivityContextProvider>
                <MemberContextProvider>
                    <CotisationContextProvider>
                        {children}
                    </CotisationContextProvider>
                </MemberContextProvider>
            </ActivityContextProvider>
        </AuthContextProvider>
    );
};

export default RequestContextProvider;

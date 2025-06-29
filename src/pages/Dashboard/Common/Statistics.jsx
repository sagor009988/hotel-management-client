import React from 'react';
import useRole from '../../../hooks/useRole';
import AdminStatistics from '../Admin/AdminStatistics';
import GuestStatistics from '../Guest/GuestStatistics';
import HostStatistics from '../Host/HostStatistics';

const Statistics = () => {
    const [role,isLoading]=useRole()
    return (
        <div>
            Well Come to statistics {role} page
            {
                role && role==="admin" && <AdminStatistics></AdminStatistics>
            }
            {
                role && role==="guest" && <GuestStatistics></GuestStatistics>
            }
            {
                role && role==="host" && <HostStatistics></HostStatistics>
            }
        </div>
    );
};

export default Statistics;
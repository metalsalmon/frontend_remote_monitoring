import Box from '@material-ui/core/Box';

const DeviceDetail = ({ data }) => {

    return(
        <div>
            <h2>
                
                <Box component="div" display="inline" p={1} m={1}>{data.name}</Box>
                <Box component="div" display="inline" p={1} m={1}>{data.ip}</Box>
                <Box component="div" display="inline" p={1} m={1}>{data.mac}</Box>
                <Box component="div" display="inline" p={1} m={1}>{data.distribution}</Box>
                <Box component="div" display="inline" p={1} m={1}>{data.version}</Box>
            </h2>

        </div>
    );
};

export default DeviceDetail;
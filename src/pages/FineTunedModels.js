import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import {
    Grid,
    Button,
} from '@material-ui/core';
import PlusIcon from '../icons/Plus';
import PageContainer from '../components/layouts/PageContainer';
import PageTitle from '../components/layouts/PageTitle';
import { useDispatch } from '../store';
import ModelCreateModal from '../components/fineTunedModels/ModelCreateModal';
import ModelList from '../components/fineTunedModels/ModelList';
import PlaygroundContainer from '../components/playground/PlaygroundContainer';

const Monitors = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(monitorList());
    }, [ dispatch ]);
    const [createModalOpen, setCreateModalOpen] = React.useState(false);

    return (
        <>
            <Helmet>
                <title>Fine-Tuned Models</title>
            </Helmet>
            <PageContainer>
                <PageTitle
                    title="Fine-Tuned Models"
                    subtitle="Create custom models from your data sets."
                    actionComponent={() => (
                        <Grid item>
                            <Button
                                color="primary"
                                startIcon={<PlusIcon fontSize="small" />}
                                variant="contained"
                                onClick={() => setCreateModalOpen(true)}
                            >
                                Create Monitor
                            </Button>
                        </Grid>
                    )}
                />
                <ModelList />

                <PageTitle
                    title="Playground"
                    subtitle="Test your previously created models below."
                />
                <PlaygroundContainer />
            </PageContainer>
            <ModelCreateModal open={createModalOpen} handleClose={() => setCreateModalOpen(false)} />
        </>
    );
}

export default Monitors;
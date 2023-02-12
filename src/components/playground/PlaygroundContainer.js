/**
 * Component for the playground container.
 */
import {
    Paper,
    CardContent,
} from '@material-ui/core';
import PlaygroundForm from './PlaygroundForm';

const PlaygroundContainer = () => (
    <Paper>
        <CardContent>
            <PlaygroundForm />
        </CardContent>
    </Paper>
);

export default PlaygroundContainer;
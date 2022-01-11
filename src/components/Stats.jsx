import '../styles/Stats.css';

const Stats = (props) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>Lonely proteins</td>
                    <td>{props.statistiques.isolees}</td>
                </tr>
                <tr>
                    <td>Linked proteins</td>
                    <td>{props.statistiques.non_isolees}</td>
                </tr>
                <tr>
                    <td>Labelled proteins</td>
                    <td>{props.statistiques.labellees}</td>
                </tr>
                <tr>
                    <td>Unlabelled proteins</td>
                    <td>{props.statistiques.non_labellees}</td>
                </tr>
           </tbody>
        </table>
    );
}

export default Stats;

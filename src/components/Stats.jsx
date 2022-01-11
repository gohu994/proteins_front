import '../styles/Stats.css';

const Stats = (props) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>Protéines isolées</td>
                    <td>{props.statistiques.isolees}</td>
                </tr>
                <tr>
                    <td>Protéines liées</td>
                    <td>{props.statistiques.non_isolees}</td>
                </tr>
                <tr>
                    <td>Protéines labellées</td>
                    <td>{props.statistiques.labellees}</td>
                </tr>
                <tr>
                    <td>Protéines non labellées</td>
                    <td>{props.statistiques.non_labellees}</td>
                </tr>
           </tbody>
        </table>
    );
}

export default Stats;

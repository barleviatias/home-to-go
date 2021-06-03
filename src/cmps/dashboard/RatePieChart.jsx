import { Doughnut } from 'react-chartjs-2';

export function RatePieChart({ stay }) {



    function getRateData() {
        var chartData = stay.reviews.reduce((acc, review) => {
            acc[Math.round(review.avgRate) - 1]++
            return acc
        }, [0, 0, 0, 0, 0])
        return chartData;
    }

    const data = {
        labels: ['1 Star', '2 Star', '3 Star', '4 Star', '5 Star'],
        datasets: [
            {
                label: '# of Votes',
                data: getRateData(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <div className="rate-chart">
            <Doughnut data={data} />
        </div>
    )
}
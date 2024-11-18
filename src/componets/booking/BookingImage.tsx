import { Card, Image } from 'react-bootstrap'

export function BookingImage({ posterUrl }: Readonly<{ posterUrl: string }>) {
    return (
        <Card className="mt-4 mt-md-0" style={{ width: '100%' }}>
            <Image className="rounded" src={posterUrl} />
        </Card>
    )
}

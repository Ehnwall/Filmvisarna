import { Button, Form, Row, Col, InputGroup, Badge } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import { HiOutlinePlus } from 'react-icons/hi'

interface AddGroupProps {
    groupName: string

    setGroup: React.Dispatch<React.SetStateAction<string>>

    name: string

    GroupList: string[]

    setGroupList: React.Dispatch<React.SetStateAction<string[]>>
}

const addGroup: React.FC<AddGroupProps> = ({ groupName, GroupList, setGroupList, setGroup, name }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroup(event.target.value)
    }

    const addList = () => {
        if (groupName.trim() !== '') {
            setGroupList([...GroupList, groupName])
            setGroup('')
        }
    }

    const handleDelete = (groupName: string) => {
        setGroupList((oldValues) => {
            return oldValues.filter((name) => name !== groupName)
        })
    }

    return (
        <Col md={4}>
            <Form.Label>Lägg till {name}</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder={name}
                    aria-label="cast"
                    aria-describedby="basic-addon1"
                    name={groupName}
                    value={groupName}
                    onChange={handleChange}
                />
                <InputGroup.Text as={Button} onClick={addList} id="basic-addon1">
                    <HiOutlinePlus className="fs-4" />
                </InputGroup.Text>
            </InputGroup>
            <Row xs="auto">
                {GroupList.map((name: string) => (
                    <Col key={name}>
                        <Badge className="text-black" style={{ cursor: 'pointer' }}>
                            {name} <MdDelete className="fs-5" onClick={() => handleDelete(name)} />
                        </Badge>
                    </Col>
                ))}
            </Row>
        </Col>
    )
}

export default addGroup

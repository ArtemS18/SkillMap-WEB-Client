import { Card, Button, Accordion, ListGroup } from "react-bootstrap";
import type { IModuleDetails, IRoadmap} from "../../types";
import { useEffect, useRef } from "react";

export type RoadmapProps = {
    activeRoadmap: IRoadmap;
    activeKey: string;
    activeModule: IModuleDetails
    onCompliteModule: ()=>void;
    onCompliteRoadmap: ()=>void
}

function ActiveRoadmap({activeRoadmap, activeKey, activeModule, onCompliteModule}: RoadmapProps){
    // visibleModules = activeRoadmap?.path.slice(activeRoadmap?.complited ?? 0) ?? [];
    const activeRef = useRef<HTMLDivElement | null>(null);

    useEffect(
        ()=>{
            activeRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center"});
        },
        [activeRoadmap.complited]
    )

    return (
        <>
            <Card.Title style={{margin: "20px", alignItems: "center", justifyContent: "center"}}>
                <h1>Твой текущий роадмап</h1>
            </Card.Title>
            <Accordion activeKey={activeKey} flush={true} className="mb-3">
            {activeRoadmap.path.map((step, i) => {
                let index = i;
                const isActive = activeRoadmap.complited === index
                return ( 
                <>
                    <div key={step.id} ref={isActive ? activeRef : null}>
                    <Accordion.Item eventKey={index.toString()}>
                        <Accordion.Header>
                        <span style={activeRoadmap.complited !== index ? { color: "#aaa", pointerEvents: "none" } : {}}>
                            {index < activeRoadmap.complited && (
                            <span className="ms-2"> ✅</span>
                            )}{step.name}
                        </span>
                        </Accordion.Header>
                        <Accordion.Body className="p-4">
                        {step?.skills && step.skills.length > 0 && (
                            <>
                            {isActive && activeModule && (
                                <>
                                <h3 className="mb-3">{activeModule.level}</h3>
                                <p className="mb-4">{activeModule.description}</p>
                                <h5 className="mb-3">Полезные ссылки</h5>
                                <ListGroup as="ol" numbered className="mb-4">
                                    {activeModule.links.map((link, i) => (
                                    <ListGroup.Item 
                                        variant="dark"
                                        className="d-flex justify-content-between align-items-start p-3"
                                        key={i}
                                    >
                                        <div className="ms-2 me-auto">
                                        <div className="fw-bold">
                                            <a href={link.url} className="text-decoration-none">
                                            {link.title}
                                            </a>
                                        </div>
                                        </div>
                                    </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                </>
                            )}
                            <div className="fw-bold mb-3">
                                <h5>Основные идеи модуля</h5>
                            </div>
                            <ListGroup className="mb-4">
                                {step.skills.map(skill => (
                                <ListGroup.Item
                                    variant="dark"
                                    className="d-flex justify-content-between align-items-start p-3"
                                    key={skill.id}
                                >
                                    <div className="ms-2 me-auto">
                                    {skill.name}
                                    </div>
                                </ListGroup.Item>
                                ))}
                            </ListGroup>
                            </>
                        )}
                        {isActive && (
                            <Button 
                            variant="success" 
                            id="button-addon2" 
                            style={{margin: "10px"}} 
                            onClick={onCompliteModule}
                            className="w-100 w-md-50"
                            >
                            Завершить модуль!
                            </Button>
                        )}
                        </Accordion.Body>
                    </Accordion.Item>
                    </div>
                </>
                )
            })}
            </Accordion>

        </>
    )
}
export default ActiveRoadmap;
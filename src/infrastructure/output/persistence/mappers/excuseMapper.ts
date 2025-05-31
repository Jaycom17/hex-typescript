import { createMapper, createMap, forMember, mapFrom } from "@automapper/core";
import { classes } from "@automapper/classes";
import { Excuse } from "../../../../domain/models/excuse";
import { ExcuseEntity } from "../models/excuse.model";

// Mapper config
const mapper = createMapper({
  strategyInitializer: classes(),
});

// Mapping configuration
createMap(
    mapper,
    ExcuseEntity,
    Excuse,
    forMember(
        (destination) => destination.id,
        mapFrom((source) => source.id)
    ),
    forMember(
        (destination) => destination.text,
        mapFrom((source) => source.text)
    ),
    forMember(
        (destination) => destination.createdAt,
        mapFrom((source) => source.createdAt)
    )
);
createMap(
    mapper,
    Excuse,
    ExcuseEntity,
    forMember(
        (destination) => destination.id,
        mapFrom((source) => source.id)
    ),
    forMember(
        (destination) => destination.text,
        mapFrom((source) => source.text)
    ),
    forMember(
        (destination) => destination.createdAt,
        mapFrom((source) => source.createdAt)
    )
);

export { mapper as excuseMapper };
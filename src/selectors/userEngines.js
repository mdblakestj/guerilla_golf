const getUserEngines = (engines, user) => {
  return engines.filter((engine) => engine.createdBy === user.uid)
}

export default getUserEngines;

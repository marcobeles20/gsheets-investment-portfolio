function delete_trigger(trigger_name)
{
  const triggers = ScriptApp.getProjectTriggers();

  for(const index in triggers)
  {
    if(triggers[index].getHandlerFunction() != trigger_name)
      continue;

    ScriptApp.deleteTrigger(triggers[index]);
  }
}
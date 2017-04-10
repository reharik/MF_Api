
module.exports = function(logger,
                          eventstore,
                          rx,
                          applicationFunctions,
                          mapAndFilterStream) {

  return continuationId => {
    logger.info('startDispatching | startDispatching called');
    const eventAppeared = eventstore.eventEmitterInstance();
    var mAndF = mapAndFilterStream('notification');
    var ef = applicationFunctions.eventFunctions;
    var subscription = eventstore.gesConnection.subscribeToAllFrom(
      null,
      false,
      eventAppeared.emitEvent,null,null,
      eventstore.credentials);

    logger.info("subscription.isSubscribedToAll: " + subscription.isSubscribedToAll);

    return rx.Observable.fromEvent(eventAppeared.emitter, 'event')

      .filter(mAndF.isValidStreamType)

      .first(note => mAndF.continuationId(note).getOrElse() == continuationId
        && ef.parseData(note).getOrElse().initialEvent.metadata.streamType == 'command')
      .map(note => ef.parseData(note).getOrElse())
      .toPromise();
  }
};

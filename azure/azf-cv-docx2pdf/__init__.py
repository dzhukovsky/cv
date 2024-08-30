import datetime
import logging
import azure.functions as func

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Processing request for time offset.')

    try:
        offset = int(req.params.get('offset'))

        current_time_utc = datetime.datetime.utcnow()

        offset_time = current_time_utc + datetime.timedelta(hours=offset)
        formatted_time = offset_time.strftime('%Y-%m-%d %H:%M:%S')

        return func.HttpResponse(f"Current time with offset {offset} is: {formatted_time}")

    except ValueError:
        return func.HttpResponse(
            "Please pass a valid integer for 'offset'.",
            status_code=400
        )

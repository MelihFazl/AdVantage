import sys

def modify_string(input_string):
    return input_string + " Hello Worlddd"

if __name__ == "__main__":
    # Assuming the input string is passed as a command-line argument
    if len(sys.argv) != 2:
        print("Usage: python modify_string.py <input_string>")
        sys.exit(1)

    input_string = sys.argv[1]
    result = modify_string(input_string)

    # Print the modified string to stdout
    print(result)
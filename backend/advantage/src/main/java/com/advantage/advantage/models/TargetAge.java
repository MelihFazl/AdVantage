package com.advantage.advantage.models;

public enum TargetAge {
    ZERO_TO_EIGHTEEN("0-18"),
    EIGHTEEN_TO_TWENTY_FOUR("18-24"),
    TWENTY_FIVE_TO_THIRTY_FOUR("25-34"),
    THIRTY_FOUR_TO_FIFTY_FOUR("34-54"),
    FIFTY_FIVE_TO_SIXTY_FOUR("55-64"),
    SIXTY_FIVE_PLUS("65+");

    private final String label;

    TargetAge(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
